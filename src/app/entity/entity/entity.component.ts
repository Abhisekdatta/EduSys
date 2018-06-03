import { EntityViewComponent } from './entityview/entityview.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { EntityModel } from './entity.model';
import { Page } from './../../core/model/paging/pageable.model';
import { EntityService } from './../entity.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatSort, MatDialog, PageEvent, Sort, MatSnackBar } from '@angular/material';
import { EntityDailog } from './../entity/entitydialog/entitydailog.component';
import { DeleteDailog } from 'app/component/delete/deletedailog.component';


@Component({
    selector: 'com-entity',
    templateUrl: './entity.component.html',
    styleUrls: ['./entity.component.scss']
  })
export class EntityComponent implements OnInit{

  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  bufferValue = 75;
  progressBar=false;

  

  //---------Pagination(start-------
  length:number;
  pageSize = 5;
  pageSizeOptions = [5, 10, 25, 100];
  pageEvent: PageEvent;
  //---------Pagination(end)---------

  displayedColumns = ['select','name', 'email', 'contactNo', 'numberOfUser','contractStartDate','contractEndDate','isActive'];
  entityDatabase:EntityDatabase|null;
  dataSource: EntityDataSource | null;
  selection = new SelectionModel<string>(true, []);

  entityId:number;
  private entityIdList:number[]=new Array();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;
  
  
  constructor(private _entityService:EntityService,
              private entityDialog:MatDialog,
              private deleteDialog:MatDialog,
              private snackBar: MatSnackBar){}
  ngOnInit(): void {
   
    this.entityDatabase=new EntityDatabase(this._entityService,this.pageEvent);
    this.dataSource=new EntityDataSource(this.entityDatabase,this.paginator,this.sort);
   
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
              .debounceTime(150)
              .distinctUntilChanged()
              .subscribe(() => {
                this.progressBar=true;
                console.log(this.filter.nativeElement.value);
                if (!this.dataSource) { return; }
                this.dataSource.filter = this.filter.nativeElement.value;
                this.progressBar=false;
              });
   
                       
  }

  isAllSelected(): boolean {
    if (!this.dataSource) { return false; }
    if (this.selection.isEmpty()) {return false; }

    if (this.filter.nativeElement.value) {
      return this.selection.selected.length == this.dataSource.renderedData.length;
    } else {
      return this.selection.selected.length == this.entityDatabase.data.length;
    }
  }
  masterToggle() {
    if (!this.dataSource) { return; }

    if (this.isAllSelected()) {
      this.selection.clear();
    } else if (this.filter.nativeElement.value) {
      this.dataSource.renderedData.forEach(data => this.selection.select(data.id.toString()));
    } else {
      this.entityDatabase.data.forEach(data =>this.selection.select(data.id.toString()));
    }
  }


  openEntityDailog(){
    let dailogRef=this.entityDialog.open(EntityDailog,{
      width:'600px',
      height:'Auto',
    });
     dailogRef.afterClosed().subscribe(result=>{
      this.entityDatabase=new EntityDatabase(this._entityService);
      this.dataSource=new EntityDataSource(this.entityDatabase,this.paginator,this.sort);
     });
  }

  editEntity(){
    let dailogRef=this.entityDialog.open(EntityDailog,{
      width:'600px',
      height:'Auto',
      data: { entityId: this.selection.selected}
    });
     dailogRef.afterClosed().subscribe(result=>{
      this.entityDatabase=new EntityDatabase(this._entityService);
      this.dataSource=new EntityDataSource(this.entityDatabase,this.paginator,this.sort);
     });
  }
  /*setEntityId(entityId:any){
    this.selection.toggle(entityId);
    this.entityIdList.push(entityId);
  }*/
  deleteEntity(){
    let dailogRef=this.deleteDialog.open(DeleteDailog,{
      width:'400px',
      data:{entityIdList:this.selection.selected}
    });
    dailogRef.afterClosed().subscribe(result=>{
      this.entityDatabase=new EntityDatabase(this._entityService);
      this.dataSource=new EntityDataSource(this.entityDatabase,this.paginator,this.sort);
     });
  }

  paginate(pageEvent:PageEvent){
    this.pageEvent=pageEvent;
    this.entityDatabase=new EntityDatabase(this._entityService,this.pageEvent);
    this.dataSource=new EntityDataSource(this.entityDatabase,this.paginator,this.sort);
  }

  sortData(sort: Sort){
    this.entityDatabase=new EntityDatabase(this._entityService,this.pageEvent,sort);
    this.dataSource=new EntityDataSource(this.entityDatabase,this.paginator,this.sort);
  }

  updateEntityStatus(status:boolean,entityId:number){
    this._entityService.updateEntityStatus(status,entityId).subscribe(response=>{
      console.log(response);
    });
  }

  openSnackBar(entityModel:EntityModel) {
    let snackBarRef = this.snackBar.openFromComponent(EntityViewComponent,{
      duration:5000,
      data: entityModel,
      politeness:"assertive",
    });
  }
}
export class EntityDatabase {
  private filterString:string;
  private totalLength:number;
  dataChange: BehaviorSubject<EntityModel[]> = new BehaviorSubject<EntityModel[]>([]);
  get data(): EntityModel[] { return this.dataChange.value; }

  getData(_filterString:string){
    this.filterString=_filterString;
    return this.dataChange.value;
  }

  entityModels:EntityModel[];
  constructor(private _entityService:EntityService,
              private pageEvent?:PageEvent,
              private sortActiveAndDirection?:Sort) {
    if(this.pageEvent==null){
      this.pageEvent=new PageEvent();
      this.pageEvent.pageIndex=0;
      this.pageEvent.pageSize=5;
    }
     this._entityService.findAllEntity(this.pageEvent,
                                       sortActiveAndDirection,
                                       this.filterString)
                        .subscribe(res=>{
                                  this.entityModels=res.content;
                                  this.totalLength=res.totalElements;
                                  this.addEntity(this.entityModels); 
                        });
  }
  addEntity(entityModels) {
    const copiedData = this.data.slice();
    for(let entityModel of entityModels){
      copiedData.push(entityModel);
    }
    this.dataChange.next(copiedData);
  }
 
}
export class EntityDataSource extends DataSource<any>{

  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }

  filteredData: EntityModel[] = [];
  renderedData: EntityModel[] = [];
  
  constructor(private _entityDatabase: EntityDatabase,
    private _paginator: MatPaginator,
    private _sort: MatSort ){
      super();
    }

  connect(): Observable<EntityModel[]> {
    
    const displayDataChanges = [
      this._entityDatabase.dataChange,
      this._sort.sortChange, 
      this._filterChange,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      // Filter data
     /* this.filteredData = this._entityDatabase.data.slice().filter((item: EntityModel) => {
        let searchStr = (item.name + item.contactNo).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });*/

      this.filteredData = this._entityDatabase.getData(this._filterChange.value).slice().filter((item: EntityModel) => {
        let searchStr = (item.name + item.contactNo).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });
      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

     
      this.renderedData = sortedData;
      return this.renderedData;
    });
  }
  disconnect() {
  }

  sortData(data: EntityModel[]): EntityModel[] {
    if (!this._sort.active || this._sort.direction == '') { return data; }

    return data.sort((a, b) => {
      let propertyA: number|string|Date|boolean = '';
      let propertyB: number|string|Date|boolean = '';

      switch (this._sort.active) {
        case 'numberOfUser': [propertyA, propertyB] = [a.numberOfUser, b.numberOfUser]; break;
        case 'name': [propertyA, propertyB] = [a.name, b.name]; break;
        case 'email': [propertyA, propertyB] = [a.email, b.email]; break;
        case 'contactNo': [propertyA, propertyB] = [a.contactNo, b.contactNo]; break;
        case 'contractStartDate': [propertyA, propertyB] = [a.contractStartDate, b.contractStartDate]; break;
        case 'contractEndDate': [propertyA, propertyB] = [a.contractEndDate, b.contractEndDate]; break;
        case 'isActive': [propertyA, propertyB] = [a.isActive, b.isActive]; break;
      }

      let valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      let valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction == 'asc' ? 1 : -1);
    });
  }
}