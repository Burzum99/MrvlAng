import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from '../Services/data.service';
import { ModalData } from '../Models/modal-data.model';
import { Comic } from '../Models/comic.model';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  constructor(public dialogRef: MatDialogRef<ModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: ModalData,
              public dataService: DataService) {}

  public async addtoFavorites(modalData: ModalData) {
    this.dataService.addFavoriteBook(modalData.comic);
    this.dialogRef.close();
  }

  public async removeFromFavorites(comic: Comic) {
    this.dataService.deleteFavoriteComic(comic);
    this.dialogRef.close();
  }

  public async onNoClick() {
    this.dialogRef.close();
  }
}
