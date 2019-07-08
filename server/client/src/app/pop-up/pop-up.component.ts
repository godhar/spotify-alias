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

  constructor(private dialogRef: MatDialogRef<PopUpComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.dialogueTitle = data.title;
    this.dynamicContent = data.content;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }

}
