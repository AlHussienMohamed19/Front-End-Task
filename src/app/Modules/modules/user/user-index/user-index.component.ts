import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../@AppService/services/user.service';
import { UserSearchOutputModel } from '../../../../@AppService/models/user/userSearchOutputModel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Utilities } from '../../../../@Core/utility/utilities';


@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrl: './user-index.component.css'
})
export class UserIndexComponent implements OnInit {
  userSearchForm!: FormGroup;
  userSearchOutputModel: UserSearchOutputModel[] = [];
  filteredUsers: UserSearchOutputModel[] = [];
  paginatedUsers: UserSearchOutputModel[] = [];
  currentPage = 1;
  itemsPerPage = Utilities.PageSizeOptions[0];
  resultsLength = 0;
  language!: string;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {
    this.language = this.getCurrentLanguage();
    this.createForm();
  }

  ngOnInit(): void {
    this.getUsers();
  }

  //#region Form Initialization
  private createForm(): void {
    this.userSearchForm = this.fb.group({
      fullName: ['', [Validators.maxLength(500)]],
      email: ['', [Validators.maxLength(500), Validators.pattern(Utilities.EmailPattern)]],
      phone: [''],
    });
  }
  //#endregion

  //#region Data Fetching
  private getUsers(): void {
    this.spinner.show();
    this.userService.search().subscribe({
      next: (res: UserSearchOutputModel[]) => {
        this.spinner.hide();
        this.userSearchOutputModel = res;
        this.filteredUsers = res;
        this.resultsLength = res.length;
        this.updatePaginatedData();
      },
      error: (err) => {
        this.spinner.hide();
        this.handleError(err);
      },
    });
  }
  //#endregion

  //#region Search and Filter
  onSearch(): void {
    const { fullName, email, phone } = this.userSearchForm.value;
    this.filteredUsers = this.userSearchOutputModel.filter(item => {
      return (
        (!fullName || item.name.toLowerCase().includes(fullName.trim().toLowerCase())) &&
        (!email || item.email.toLowerCase().includes(email.trim().toLowerCase())) &&
        (!phone || item.phone.includes(phone.trim()))
      );
    });
    this.currentPage = 1;
    this.updatePaginatedData();
  }
  //#endregion

  //#region Pagination
  private updatePaginatedData(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedData();
  }

  get totalPages(): number {
    return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
  }
  //#endregion

  //#region Language Methods
  private getCurrentLanguage(): string {
    return JSON.parse(localStorage.getItem('currentLanguage')!) || 'en';
  }
  //#endregion

  //#region Handle Error Methods
  private handleError(error: any): void {
    const errorMsg = error?.message || 'An unexpected error occurred';
    this.showError(errorMsg);
  }

  showError(message: string): void {
    this.toastr.error(message, 'Error');
  }
  //#endregion

  clear(): void {
    this.userSearchForm.reset();
    this.getUsers();
  }

  get fc() {
    return this.userSearchForm.controls;
  }
}
