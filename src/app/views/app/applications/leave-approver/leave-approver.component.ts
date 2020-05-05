import {  Component, OnInit, OnDestroy,ElementRef, HostListener, ViewChild, AfterContentInit , ChangeDetectorRef, Renderer2 } from '@angular/core';
import { ISurvey, SurveyService } from '../survey/survey.service';
import { Colors } from 'src/app/constants/colors.service';
import { ChartService } from 'src/app/components/charts/chart.service';
import { ScrollableComponent } from 'src/app/views/app/ui/datatables/scrollable/scrollable.component'; 
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { ApiService, IProduct } from 'src/app/data/api.service';
import { ContextMenuComponent } from 'ngx-contextmenu';

import { ChatComponent } from 'src/app/views/app/applications/chat/chat.component';
import { ChatService, IChatContact, IChatConversation } from 'src/app/views/app/applications/chat/chat.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';


import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
@Component({
  selector: 'app-leave-approver',
  templateUrl: './leave-approver.component.html'
})
export class LeaveApproveComponent implements OnInit, OnDestroy {
  @ViewChild('basicMenu') public basicMenu: ContextMenuComponent;
  @ViewChild(DatatableComponent) table: DatatableComponent; 
  
  @ViewChild('scroll') scrollRef: PerfectScrollbarComponent;


  chartDataConfig: ChartService;
  productDataConfig: ApiService;

  currentSurvey: ISurvey;
  colors = Colors.getColors();
 

  contacts: IChatContact[];
  conversations: IChatConversation[];
  currentUserId = 1;

  selectedConversation: IChatConversation;

  contacts$: Observable<IChatContact[]>;

  searchTerms = new Subject<string>();
  searchKeyword = '';
  message = '';





  ColumnMode = ColumnMode;
  headerHeight = 30;
  rowHeight = 60;
  itemsPerPage = 15;
  currentPage = 0;

  isLoading: boolean;
  rows: IProduct[] = [];
  columns = [
    { prop: 'title', name: 'Title' },
    { prop: 'sales', name: 'Sales' },
    { prop: 'category', name: 'Category' },
    { prop: 'id', name: 'Id' }
  ];
  screenHeight: number;
  selected = [];
  temp = [];
  SelectionType = SelectionType;
  selectAllState = '';
  endOfTheList = false;




  ageChartData = {
    labels: ['12-24', '24-30', '30-40', '40-50', '50-60'],
    datasets: [{
      label: '',
      borderColor: [
        this.colors.themeColor1,
        this.colors.themeColor2,
        this.colors.themeColor3,
        this.colors.themeColor4,
        this.colors.themeColor5
      ],
      backgroundColor: [
        this.colors.themeColor1_10,
        this.colors.themeColor2_10,
        this.colors.themeColor3_10,
        this.colors.themeColor4_10,
        this.colors.themeColor5_10
      ],
      borderWidth: 2,
      data: [15, 25, 20, 30, 14]
    }]
  };

  genderChartData = {
    labels: ['Male', 'Female', 'Other'],
    datasets: [{
      label: '',
      borderColor: [
        this.colors.themeColor1,
        this.colors.themeColor2,
        this.colors.themeColor3
      ],
      backgroundColor: [
        this.colors.themeColor1_10,
        this.colors.themeColor2_10,
        this.colors.themeColor3_10
      ],
      borderWidth: 2,
      data: [85, 45, 20]
    }]
  };

  workChartData = {
    labels: [
      'Employed for wages',
      'Self-employed',
      'Looking for work',
      'Retired'
    ],
    datasets: [{
      label: '',
      borderColor: [
        this.colors.themeColor1,
        this.colors.themeColor2,
        this.colors.themeColor3,
        this.colors.themeColor4
      ],
      backgroundColor: [
        this.colors.themeColor1_10,
        this.colors.themeColor2_10,
        this.colors.themeColor3_10,
        this.colors.themeColor4_10
      ],
      borderWidth: 2,
      data: [15, 25, 20, 8]
    }]
  };

  codingChartData = {
    labels: ['Python', 'JavaScript', 'PHP', 'Java', 'C#'],
    datasets: [{
      label: '',
      borderColor: [
        this.colors.themeColor1,
        this.colors.themeColor2,
        this.colors.themeColor3,
        this.colors.themeColor4,
        this.colors.themeColor5
      ],
      backgroundColor: [
        this.colors.themeColor1_10,
        this.colors.themeColor2_10,
        this.colors.themeColor3_10,
        this.colors.themeColor4_10,
        this.colors.themeColor4_10
      ],
      borderWidth: 2,
      data: [15, 25, 20, 8, 25]
    }]
  };

  constructor(private chatService: ChatService,private surveyService: SurveyService, private chartService: ChartService,
     private    apiService: ApiService,    private changeDetectorRef: ChangeDetectorRef, private renderer: Renderer2,
     
       private el: ElementRef) {
    this.chartDataConfig = this.chartService;
    this.productDataConfig = this.apiService;
  }

  
 /// constructor(private chatService: ChatService, private changeDetectorRef: ChangeDetectorRef, private renderer: Renderer2) { }

  // ngOnInit() {
  //   ///  this.renderer.addClass(document.body, 'right-menu');
  //   this.onScroll(null);
  //     this.getItems();

  //     this.getContacts();

  //     this.contacts$ = this.searchTerms.pipe(
  //       this.chat
  //       debounceTime(300),
  //       distinctUntilChanged(), 
  //       switchMap((term: string) => this.chatService.searchContacts(this.currentUserId, term)),
  //     );
  //   }

    ngOnInit() {
      this.renderer.addClass(document.body, 'no-footer');
      this.getItems();
      this.onScroll(null);
      this.getContacts();
  
      this.contacts$ = this.searchTerms.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) => this.chatService.searchContacts(this.currentUserId, term)),
      );
    }
  
  
    ngAfterContentInit() {
    }
  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    this.screenHeight = window.innerHeight;
  }
  @HostListener('window:scroll', ['$event'])
  onScroll(event?) {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
    const max = document.documentElement.scrollHeight;
    this.getScreenSize();
    if ((!this.isLoading && pos === max) || (!this.isLoading && event === null)) {
      const limit = this.itemsPerPage;
      this.currentPage++;
      this.loadPage(limit);
    }
  }
  
  loadPage(limit: number) {
    this.isLoading = true;
   var daa =  this.apiService.getProducts(limit, this.currentPage).subscribe(
      data => {
        if (data.status) {
          this.isLoading = false;
          const rows = [...this.rows, ...data.data];
          this.rows = rows;
          this.temp = [...this.rows, ...data.data];
          this.setSelectAllState();
        } else {
          this.endOfTheList = true;
        }
      },
      error => {
        this.isLoading = false;
      }
    );
    console.log(daa);
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase().trim();
    const count = this.columns.length;
    const keys = Object.keys(this.temp[0]);
    const temp = this.temp.filter(item => {
      for (let i = 0; i < count; i++) {
        if ((item[keys[i]] && item[keys[i]].toString().toLowerCase().indexOf(val) !== -1) || !val) {
          return true;
        }
      }
    });
    this.rows = temp;
    this.table.offset = 0;
  }


  searchFilter(event) {
    const val = event.target.value.toLowerCase().trim();
    const count = this.columns.length;
    const keys = Object.keys(this.temp[0]);
    const temp = this.temp.filter(item => {
      for (let i = 0; i < count; i++) {
        if ((item[keys[i]] && item[keys[i]].toString().toLowerCase().indexOf(val) !== -1) || !val) {
          return true;
        }
      }
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    this.setSelectAllState();
  }

  setSelectAllState() {
    if (this.selected.length === this.rows.length) {
      this.selectAllState = 'checked';
    } else if (this.selected.length !== 0) {
      this.selectAllState = 'indeterminate';
    } else {
      this.selectAllState = '';
    }
  }

  selectAllChange($event) {
    if ($event.target.checked) {
      this.selected = [...this.rows];
    } else {
      this.selected = [];
    }
    this.setSelectAllState();
  }


  

  ngOnDestroy() {
  //  this.renderer.removeClass(document.body, 'right-menu');
  }
  getItems() {
    this.surveyService.getSurveyItems()
      .subscribe(items => {
        this.currentSurvey = items[0];
      });
  }

  addNewQuestion() {
    // this.currentSurvey.questions.push({
    //   id: this.currentSurvey.questions.length + 1,
    //   title: 'New Question',
    //   question: 'Question',
    //   answerType: 0,
    //   answers: []
    // });
  }


/////////////////////////////////////////////////////////////////////////////////////////


search(term: string): void {
  this.searchKeyword = term;
  this.searchTerms.next(term);
}
search2(term: string): void {
  this.searchKeyword = term;
  this.searchTerms.next(term);
}

getContacts() {
  this.chatService.getContacts()
    .subscribe(contacts => {
      this.contacts = contacts;
      this.getConversations();
    });
}

getConversations() {
  this.chatService.getConversations(this.currentUserId)
    .subscribe(conversations => {
      this.conversations = conversations;
      this.selectedConversation = this.conversations[0];
      this.changeDetectorRef.detectChanges();
      if (this.scrollRef) {
        this.scrollRef.directiveRef.scrollToBottom();
      }
    });
}
selectConversation(conversationId: number) {
  this.selectedConversation = this.conversations.find(x => x.id === conversationId);
  if (this.scrollRef) {
    setTimeout(() => { this.scrollRef.directiveRef.scrollToBottom(); }, 100);
  }
}


getOtherUser(users: number[]): IChatContact {
  const otherId = users.find(x => x !== this.currentUserId);
  return this.contacts.find(x => x.id === otherId);
}
getUser(id: number): IChatContact {
  if (id === this.currentUserId) {
    return {
      id,
      title: 'Sarah Kortney',
      img: '/assets/img/profile-pic-l.jpg',
      date: '5 minutes ago'
    };
  }
  return this.contacts.find(x => x.id === id);
}

sendMessage() {
  if (this.message.length > 0) {
    const time = this.getCurrentTime();
    this.selectedConversation.messages.push({ sender: this.currentUserId, text: this.message, time });
    this.selectedConversation.lastMessageTime = time;
    if (this.scrollRef) {
      setTimeout(() => { this.scrollRef.directiveRef.scrollToBottom(); }, 100);
    }
    this.message = '';
  }
}

messageInputKeyUp(event: KeyboardEvent) {
  if (event.key === 'Enter') { this.sendMessage(); }
}

getCurrentTime(): string {
  const now = new Date();
  return this.pad(now.getHours(), 2) + ':' + this.pad(now.getMinutes(), 2);
}

pad(number, length) {
  let str = '' + number;
  while (str.length < length) {
    str = '0' + str;
  }
  return str;
}


}
