import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PostOption, PostOptionVote} from '../../post';

import {UtilsService} from '../../../utils.service';
import {GeneralService} from '../../../general/general.service';

@Component({
  selector: 'app-post-option-votes',
  templateUrl: './post-option-votes.component.html',
  styleUrls: ['./post-option-votes.component.css']
})
export class PostOptionVotesComponent implements OnInit {
  @Input() options: PostOption[];
  @Input() totalVotes: number;
  @Input() postId: number;
  @Input() currentUserId: number;
  @Input() multiSelection: boolean;
  @Output() voted = new EventEmitter<void>();
  currentOptionId: number;
  showDialog = false;
  votesListClicked = false;


  constructor(private service: GeneralService) {
  }

  ngOnInit() {
  }

  vote(index: number) {

    const vote = new PostOptionVote();
    vote.option = this.options[index].id;
    vote.post = this.postId;
    vote.user = this.currentUserId;

    const url = `${'vote'}`;
    this.service.createItem(url, vote)
     .then(res => {

        if (!this.multiSelection) {
          this.clearVoteStatuses();
        }
        this.options[index].votes = this.options[index].votes + 1;
        this.options[index].vote_status = true;
        this.totalVotes = this.totalVotes + 1;

        this.calcOptionsPercents();
        this.voted.emit();

      })
      .catch(error => {
        console.log(error);
      });




  }

  deleteVote(index: number) {
    const url = `${'delete-vote/'}${this.postId}${'/'}${this.options[index].id}${'/'}`;
    this.service.deleteItemByPk(url, null)
     .then(res => {

        if (!this.multiSelection) {
          this.clearVoteStatuses();
        } else {
          this.totalVotes = this.totalVotes - 1;
          this.options[index].votes = this.options[index].votes - 1;
          this.options[index].vote_status = false;
        }

        this.calcOptionsPercents();

      })
      .catch(error => {
        console.log(error);
      });


  }


  calcOptionsPercents() {
    if (this.options) {

      for (const {item, index} of UtilsService.toItemIndexes(this.options)) {
        if (this.totalVotes > 0) {
          this.options[index].votes_percent = Math.floor((item.votes / this.totalVotes) * 100);
        } else {
          this.options[index].votes_percent = 0;
        }

      }

    }
  }

  clearVoteStatuses() {
    if (this.options) {

      for (const {item, index} of UtilsService.toItemIndexes(this.options)) {

        if (item.vote_status) {
          this.totalVotes = this.totalVotes - 1;
          this.options[index].votes = this.options[index].votes - 1;
          this.options[index].vote_status = false;

        }


      }

    }
  }


  showVotes(index: number) {

    if (this.options[index].votes > 0) {

      this.currentOptionId = this.options[index].id;

      this.votesListClicked = true;
      this.showDialog = true;
    }

  }

  onHideDialog() {
    this.currentOptionId = null;

    this.votesListClicked = false;

  }
}
