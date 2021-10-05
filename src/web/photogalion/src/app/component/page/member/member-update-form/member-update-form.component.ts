import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberFormDto } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-member-update-form',
  templateUrl: './member-update-form.component.html',
  styleUrls: ['./member-update-form.component.css']
})
export class MemberUpdateFormComponent implements OnInit {
  memberFormDto:MemberFormDto= new MemberFormDto();
  messageReturn:String;
  isSaved:Boolean;
  member: any;
  thumbnail:any;
  imagePath: any;
  event: Event;

  checkoutForm = this.formBuilder.group({
    name: "",
    firstName:"",
    pseudo:new FormControl("",Validators.required),
    birthday: "",
    mail:new FormControl("",Validators.required),
    password:new FormControl("",Validators.required),
    color:"",
    thumbnail:"",
  }); 


  constructor( private router: Router, public memberService: MemberService,private formBuilder: FormBuilder,private activatedRoute: ActivatedRoute, private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  this.getMember(this.activatedRoute.snapshot.params.id) 
  }

  public getMember(id:any){
    this.memberService.onGetMember(id).
    subscribe(data=>{
      this.member=data;
      this.thumbnail = (this._sanitizer.bypassSecurityTrustResourceUrl(this.member.thumbnail) as any).changingThisBreaksApplicationSecurity;
    },err=>{
      console.log(err);
    })
  }



  onSubmit(): String | undefined {
    if (this.checkoutForm.invalid) {
      if(this.checkoutForm.status==null){
      this.isSaved=false;
      this.messageReturn= "Certains champs sont obligatoires.";
      return this.messageReturn;
      }
    }
    // Process checkout data here
    //this.items = this.memberService.clearCart();
    try {
      // ... map les valeurs 
    this.memberFormDto= { ...this.checkoutForm.value}
    //If field of form null take the value print by bdd
    if(!this.memberFormDto.pseudo){
      this.memberFormDto.pseudo=this.member.pseudo;
    }
    
    if(!this.memberFormDto.name){
      this.memberFormDto.name=this.member.name;
    }

    if(!this.memberFormDto.birthday){
      this.memberFormDto.birthday=this.member.birthday;
    }

    if(!this.memberFormDto.firstName){
      this.memberFormDto.firstName=this.member.firstName;
    }
    
    if(!this.memberFormDto.password){
      this.memberFormDto.password=this.member.password;
    }
    
    if(!this.memberFormDto.color){
      this.memberFormDto.color=this.member.color;
    }

    if(!this.memberFormDto.mail){
      this.memberFormDto.mail=this.member.mail;
    }

    if(!this.memberFormDto.thumbnail){
      console.log("Je passe ici");
      this.memberFormDto.thumbnail=this.member.thumbnail;
    }else{
      console.log("Je passe Là memberForm : ");
      console.log(this.memberFormDto.thumbnail);
      
      console.log("Je passe Là thumbnail : ");
      console.log(this.thumbnail);
      this.memberFormDto.thumbnail=this.thumbnail;
    };


    this.memberService.onUpdateMember(this.memberFormDto, this.activatedRoute.snapshot.params.id);
    console.warn('Votre marin a été modifié', this.memberFormDto);
    this.checkoutForm.reset(); 
    this.messageReturn="Votre marin a bien été modifié"
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
      this.messageReturn = "Seules les images sont supportées pour la miniature";
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
