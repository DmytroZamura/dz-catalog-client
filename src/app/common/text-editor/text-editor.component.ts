import {Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID, ViewChild} from '@angular/core';
import Quill from 'quill';

import 'quill-mention';
import {QuillEditorComponent} from 'ngx-quill';

import {isPlatformBrowser} from '@angular/common';
import {UserImage} from '../file/file';
import {GeneralService} from '../../general/general.service';


@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.css']
})
export class TextEditorComponent implements OnInit {
  @Input() text: string;
  @Input() currentLink: '';
  @Input() placeholder = '';
  @Input() showBorder = true;
  @Input() bounds = '';
  @Input() mentions = false;
  @Input() theme = 'bubble';
  @Input() styles = '';
  @Input() checkLinks = false;
  @Input() maxLength = 10000;
  @Input() className = '';
  @Input() showAttachments = false;

  @Input() copyAttributes = false;
  @Input() showImageButton = true;

  @Input() toolbar: any[];
  @Input() scrollingContainer = '#scrolling-container';


  @Output() textChange = new EventEmitter<string>();
  @Output() mainLinkChanged = new EventEmitter<string>();


  @ViewChild(QuillEditorComponent) editor: QuillEditorComponent;


  commonToolBar: any[] = [
    ['bold', 'italic', 'underline'],        // toggled buttons
    // [{ 'header': 1 }, { 'header': 2 }],
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'align': []}],
    ['clean'],                                         // remove formatting button
    ['link']
  ];

  isBrowser = false;
  sticker = false;


  modules: any;
  modules_mention = {
    mention: {
      allowedChars: /^[а-яА-ЯёЁa-zA-Z0-9-_]*$/,
      mentionDenotationChars: ['@', '#'],
      linkTarget: '_self',
      showDenotationChar: false,
      dataAttributes: ['id', 'value', 'denotationChar', 'link', 'target', 'name', 'type', 'image'],
      renderItem(item, searchTerm) {
        let image = '';
        if (item.denotationChar === '@') {
          if (item.type === 'user') {
            image = 'static/assets/img/default-user.jpeg';
          } else {
            image = 'static/assets/img/company-default.png';
          }
          if (item.image) {
            image = item.image;
          }
        } else {
          image = 'static/assets/img/tag-min.jpg';
        }
        return `<div style="display : flex; align-items: center; ">
          <img src="${image}" style="width: 25px; height: 25px; border-radius: 50%" alt="${item.value}"/>
         <span>&nbsp;&nbsp;&nbsp;${item.value.substr(0, 30)}</span></div>`;

      },

      onSelect: (item, insertItem) => {
        if (item.denotationChar === '@') {
          if (item.type === 'company') {
            item.value = '<a class="mention-link" href="/company/' + item.link + '">@' + item.name;
          } else {
            item.value = '<a class="mention-link" href="/user-profile/' + item.link + '">@' + item.name;
          }
        }
        if (item.denotationChar === '#') {


          item.value = `${'<a class="hashtag-link" href="/hashtag/'}${item.link}${'">#'}${item.link}`;

        }

        const editor = this.editor.quillEditor as Quill;
        insertItem(item);
        // necessary because quill-mention triggers changes as 'api' instead of 'user'
        editor.insertText(editor.getLength() - 1, '', 'user');
      },
      source: (searchTerm, renderList, mentionChar) => {

        const matches = [];


        if (searchTerm.length > 0) {
          if (mentionChar === '@') {


            const endpoint = `${'search-mentions-by-name/'}${searchTerm}`;
            this.service.getItems(endpoint)
              .then(res => {

                  for (const item of res) {
                    matches.push({
                      id: item.id,
                      value: item.name,
                      link: item.slug,
                      name: item.name,
                      type: item.type,
                      image: item.image,
                      denotationChar: '@'
                    });

                  }
                  renderList(matches, searchTerm);
                }
              )
              .catch(error => {
                console.log(error);
              });


          } else {

            matches.push({id: 0, value: searchTerm, link: searchTerm});

            const endpoint = `${'search-tag-by-name/'}${searchTerm}`;
            this.service.getItems(endpoint)
              .then(res => {
                  for (const item of res) {
                    matches.push({id: item.id, value: item.name, link: item.name, name: item.name, denotationChar: '#'});

                  }
                  renderList(matches, searchTerm);
                }
              )
              .catch(error => {
                console.log(error);
              });


            renderList(matches, searchTerm);
          }

        }

      }
    },
    toolbar: [],
    autoLinks: true,
    clipboard: {
      matchVisual: false
    }
  };

  constructor(private service: GeneralService, @Inject(PLATFORM_ID) private platformId: Object) {


  }

  ngOnInit() {


    this.isBrowser = isPlatformBrowser(this.platformId);
    if (!this.toolbar) {
      this.toolbar = this.commonToolBar;
    }

    if (this.mentions) {
      this.modules_mention.toolbar = this.toolbar;
      this.modules = this.modules_mention;
    } else {
      this.modules = {
        toolbar: this.toolbar, autoLinks: true, clipboard: {
          matchVisual: false
        }
      };
    }
  }


  onEditorCreated() {

    this.setMatchFunction();
    this.checkMainLink();
    document.querySelectorAll('.ql-picker').forEach(tool => {
      tool.addEventListener('mousedown', function (event) {
        event.preventDefault();
        event.stopPropagation();
      });
    });


  }

  checkHashtagt(value: string, args?: any): any {

    return value.split(/([#][а-яА-ЯёЁa-zA-Z0-9-_]{2,})/)
      .map((val: string) => {
        if (val.startsWith('#') && value.length > 2) {

          const hashtag_name = val.replace('#', '');
          const link = `${'/hashtag/'}${hashtag_name}`;

          const textValue = `${'<a class="hashtag-link" href="'}${link}${'">#'}${hashtag_name}`;

          const mention = {index: 0, id: 0, link: link, value: textValue, denotationChar: ''};
          return {insert: {mention: mention, source: 'api'}};
        } else {
          if (val !== 'hashtag') {
            return {insert: val};
          } else {
            return {insert: ''};
          }
        }

      });


  }

  checkMainLink() {

    if (this.checkLinks) {
      const ops = this.editor.quillEditor.editor.delta.ops;
      let linkexist = false;
      for (const op of ops) {


        if (op.insert && op.attributes) {

          if (typeof op.insert === 'string' && op.attributes.link) {

            if (op.attributes.link.includes('http')) {

              linkexist = true;
              if (op.attributes.link !== this.currentLink) {

                this.currentLink = op.attributes.link;

                this.mainLinkChanged.emit(this.currentLink);

              }

              break;
            }

          }
        }


      }
      if (!linkexist) {
        this.currentLink = '';
        this.mainLinkChanged.emit(this.currentLink);
      }

    }
  }

  setMatchFunction() {
    this.editor.quillEditor.clipboard.addMatcher(Node.ELEMENT_NODE, (node, delta) => {

      const ops = [];
      delta.ops.forEach(op => {

        let link = false;
        if (op.attributes) {

          if (op.attributes.link) {


            if (typeof op.insert === 'string') {
              if (!op.insert.startsWith('#')) {
                link = true;
              }
            }

          }
        }

        if (op.insert && typeof op.insert === 'string' && !op.insert.source && !link) {
          const results = this.checkHashtagt(op.insert);


          for (const item of results) {

            if (this.copyAttributes) {
              ops.push(op);
            } else {
              ops.push(item);
            }

          }


        } else {

          if (op.insert.mention) {
            ops.push({insert: op.insert});
          }

          if (link) {
            ops.push({insert: op.insert, attributes: {link: op.attributes.link}});
          }

          if (op.insert.image) {
            if (this.sticker) {
              ops.push({insert: op.insert, attributes: {width: '120px'}});

            } else {
              ops.push({insert: op.insert, attributes: op.attributes, loading: 'lazy'});
            }
            this.sticker = false;
          }
        }


      });

      delta.ops = ops;

      return delta;

    });

    // this.editor.quillEditor.clipboard.addMatcher(Node.TEXT_NODE, (node, delta) => {
    //
    //
    //   const ops = [];
    //
    //   delta.ops.forEach(op => {
    //
    //     if (op.insert && typeof op.insert === 'string') {
    //       const results = this.checkHashtagt(op.insert);
    //
    //       for (const item of results) {
    //         ops.push(item);
    //       }
    //
    //     }
    //   });
    //   delta.ops = ops;
    //
    //   return delta;
    // });


  }

  contentChanged(event) {

    if (event.source === 'user') {

      let op = null;

      if (event.delta.ops.length === 1) {
        op = event.delta.ops[0];
      } else {
        op = event.delta.ops[1];
      }


      if (this.checkLinks && op) {
        const new_insert = op;

        if (new_insert.insert) {
          if (typeof new_insert.insert === 'string') {

            this.checkMainLink();


          }
        } else {
          if (new_insert.delete) {
            this.checkMainLink();
          }
        }

      }


      this.textChange.emit(this.text);


    }
  }

  getAlt(title: string): string {
    let alt = title.replace('.jpg', '');
    alt = alt.replace('.png', '');
    alt = alt.replace('.gif', '');
    alt = alt.replace(/_/g, ' ');
    alt = alt.replace(/-/g, ' ');



    return alt;
  }

  addImage(img) {
    this.sticker = false;
    const ths = this;
    const selection = ths.editor.quillEditor.getSelection(true);
    const newImg = '<img alt="' + this.getAlt(img.title) + '"src="' + img.url + '"></img>';

    ths.editor.quillEditor.clipboard.dangerouslyPasteHTML(selection.index, newImg, 'user');

    // ths.editor.quillEditor.insertEmbed(selection.index, 'image', img.url, 'user');
  }

  addSticker(sticker) {
    this.sticker = true;
    const ths = this;
    const selection = ths.editor.quillEditor.getSelection(true);


    const img = '<img loading="lazy" class="sticker" src="' + sticker.url + '"></img>';

    ths.editor.quillEditor.clipboard.dangerouslyPasteHTML(selection.index, img, 'user');


  }


  addEmoji(event: string) {

    this.sticker = false;
    const ths = this;
    const selection = ths.editor.quillEditor.getSelection(true);
    ths.editor.quillEditor.insertEmbed(selection.index, 'text', event, 'user');

  }


  onFileUpload(event: UserImage) {
    this.addImage({title: event.name, url: event.medium_image_url});
  }

  setHtml(html: string) {
    const ths = this;
    ths.editor.quillEditor.clipboard.dangerouslyPasteHTML(html);
  }


}
