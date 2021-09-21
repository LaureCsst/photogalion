import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberFormDto } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';

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

  checkoutForm = this.formBuilder.group({
    name: "",
    firstname:"",
    pseudo:new FormControl("",Validators.required),
    birthday: "",
    mail:new FormControl("",Validators.required),
    password:new FormControl("",Validators.required),
    color:""
  }); 


  constructor( private router: Router, public memberService: MemberService,private formBuilder: FormBuilder,private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  this.getMember(this.activatedRoute.snapshot.params.id) 
  }

  public getMember(id:any){
    this.memberService.onGetMember(id).
    subscribe(data=>{
      this.member=data;
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
      console.log("Le pseudo est : " + this.member.pseudo)
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
    this.memberService.onUpdateMember(this.memberFormDto, this.activatedRoute.snapshot.params.id);
    console.warn('Votre marin a été modifié', this.memberFormDto);
    this.checkoutForm.reset(); 
    this.messageReturn="Votre marin a bien été modifié"
    this.isSaved=true;
    return this.messageReturn;
    } catch (error) {
      return
    }
  }

  public getMembersPage(){
    this.router.navigate(['/member']);
  }

}


