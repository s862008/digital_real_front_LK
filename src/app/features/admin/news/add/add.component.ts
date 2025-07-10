import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {NewsService} from "../news.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [
    FormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButton,
  ],
  providers: [NewsService],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent implements OnInit {
  private service = inject(NewsService);
  private destroyRef = inject(DestroyRef);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private httpClient = inject(HttpClient);
  newsId: string = '';
  addNewsForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  maxFileSize: number = 5 * 1024 * 1024;
  photoInvalid: boolean = false;

  constructor() {
    this.createForm();
    this.newsId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.newsId) {
      this.service.getNews(this.newsId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(detail => {
          if (detail) {
            this.addNewsForm.patchValue(detail);
            this.imagePreview = detail.photo;
          }
        });
    }
  }

  onFileSelected(file: any) {
    const photoFile = file.target.files[0];
    const photo = this.addNewsForm.get("photo");
    if (photoFile.size > this.maxFileSize) {
      this.photoInvalid = true;
    }
    if (photoFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result; // For displaying a preview
        photo?.setValue(this.imagePreview);
        this.photoInvalid = false;
      };
      reader.readAsDataURL(photoFile); // Converts to Base64
    }
  }

  submit() {
    this.addNewsForm.markAsTouched();
    this.addNewsForm.markAsDirty();
    if (this.addNewsForm.invalid) {
      return;
    }
    if (this.newsId) {
      this.service.updateNews(this.newsId, this.addNewsForm.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(res => {
          this.router.navigate(['admin/news']).then();
        });
    } else {
      this.service.createNews(this.addNewsForm.value)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe(res => {
          this.router.navigate(['admin/news']).then();
        });
    }
  }

  private createForm() {
    this.addNewsForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.maxLength(200)]),
      photo: new FormControl(''),
      description: new FormControl('', [Validators.required, Validators.maxLength(5000)]),
    });
  }
}
