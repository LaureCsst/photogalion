import { Component, NgModule, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MemberFormDto } from 'src/app/models/member';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  //items = this.memberService.getItems();
  
  memberFormDto:MemberFormDto= new MemberFormDto();
  messageReturn:String;
  isSaved:Boolean;
  thumbnail:any;
  event: Event;

  public imagePath:any;
  imgURL: any;
  public message: string;


  checkoutForm = this.formBuilder.group({
    name: '',
    firstName:'',
    pseudo:new FormControl("",Validators.required),
    birthday: '',
    mail:new FormControl("",Validators.required),
    password:new FormControl("",Validators.required),
    color:'',
    thumbnail:''
  }); 


  constructor(public memberService: MemberService, 
    private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSubmit(): String | undefined {
    if (this.checkoutForm.invalid) {
      console.log(this.checkoutForm);
      if(this.checkoutForm.status==null){
      this.isSaved=false;
      this.messageReturn= "Certains champs sont obligatoires !!!";
      return this.messageReturn;
      }
    }
    // Process checkout data here
    //this.items = this.memberService.clearCart();
    try {
      // ... map les valeurs 
    this.memberFormDto= { ...this.checkoutForm.value}
    this.memberFormDto.thumbnail=this.thumbnail;
    this.memberService.onAddMember(this.memberFormDto);
    console.warn('Votre marin a été créé', this.memberFormDto);
    this.checkoutForm.reset(); 
    this.messageReturn="Votre marin a bien été enregistré"
    this.isSaved=true;
    return this.messageReturn;
    } catch (error) {
      return this.messageReturn;
    }
  }

  public getMembersPage(){
    this.router.navigate(['/member']);
  }

  onSelectFile(event:any) {
    if (event.target.files.length > 0)
    {
      const file = event.target.files[0];
      this.thumbnail = file;
     // this.f['profile'].setValue(file);
 
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Seules les images sont supportées pour la miniature";
      return;
    }
 
    var reader = new FileReader();
    
    this.imagePath = file;
    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.thumbnail = reader.result;
    }
  }
     
      
    }
}
