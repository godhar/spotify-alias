import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {

  private dialogueTitle: string;
  private dynamicContent: string;
  private newPlaylistConfig: boolean = false;
  private displayConfirmation: boolean = false;

  constructor(private dialogRef: MatDialogRef<PopUpComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.handleDialogueData(data);
    this.dialogueTitle = data.title;
    this.dynamicContent = data.content;
  }

  ngOnInit() {
  }

  handleDialogueData(data) {
    if(data.newPlaylist) {
      this.dialogueTitle = data.title;
      this.dynamicContent = data.content;
      this.newPlaylistConfig = true;
    }

    if(data.deleteTrack|| data.addTrack) {
      this.dialogueTitle = data.title;
      this.dynamicContent = data.content;
      this.displayConfirmation = true;
    }
  }

  close() {
    this.dialogRef.close();
  }

  confirmPlaylistName() {
    this.dialogRef.close();
  }

}
