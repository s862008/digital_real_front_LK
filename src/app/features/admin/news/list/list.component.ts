import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {NewsService} from "../../../../../../../digital_real_front_LK_NewsEdit/src/app/features/admin/news/news.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {RouterLink} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../../../../../../digital_real_front_LK_NewsEdit/src/app/features/admin/news/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatCell,
    MatCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    RouterLink
  ],
  providers: [NewsService],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  private service = inject(NewsService);
  private destroyRef = inject(DestroyRef);
  private dialog = inject(MatDialog);
  displayedColumns: string[] = ['demo-id', 'demo-title', 'demo-description', 'demo-action'];
  dataSource!: any[];

  ngOnInit(): void {
    this.getNewsList();
  }

  delete(id: string) {
    this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      height: '200px'
    }).afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {
        if (result) {
          this.service.deleteNews(id)
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(res => {
              this.getNewsList();
            });
        }
      });
  }

  private getNewsList() {
    this.service.getNewsList()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(list => {
        this.dataSource = list;
      });
  }

}
