import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-edit',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-edit.html',
  styleUrl: './create-edit.css',
})
export class CreateEdit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isEdit = !!this.route.snapshot.paramMap.get('id');
  formName = '';
  formCode = '';
  formPrice: number | null = null;

  goBack(): void {
    this.router.navigate(['/products']);
  }
}
