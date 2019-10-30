import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {

  dialogueTitle: string;
  dynamicContent: string;
  addTrack: boolean = false;
  displayConfirmation: boolean = false;
  newPlaylistName: boolean = false;
  playlistNewName: string;

  constructor(private dialogRef: MatDialogRef<PopUpComponent>,
              @Inject(MAT_DIALOG_DATA) data: {addTrack?: boolean; title: string; content?: string; newPlaylistName?: boolean;}) {
    this.dialogueTitle = data.title;
    this.dynamicContent = data.content;
    this.handleDialogueData(data);
  }

  ngOnInit() {
  }

  handleDialogueData(data) {

    if(data.newPlaylistName) {
      this.newPlaylistName = true;
    }

    if(data.deleteTrack|| data.addTrack) {
      data.addTrack ? this.addTrack = true:null;
      this.displayConfirmation = true;
    }
  }

  close() {
    this.dialogRef.close(this.addTrack);
  }

  confirmPlaylistName() {
    this.dialogRef.close(this.playlistNewName);
  }

}
