import { Component, NgModule, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MemberFormDto } from 'src/app/models/member';
import { ActivatedRoute, Router } from '@angular/router';



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

  checkoutForm = this.formBuilder.group({
    name: '',
    firstname:'',
    pseudo:new FormControl("",Validators.required),
    birthday: '',
    mail:new FormControl("",Validators.required),
    password:new FormControl("",Validators.required),
    color:''
  }); 

  constructor(public memberService: MemberService, 
    private formBuilder: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  onSubmit(): String | undefined {
    if (this.checkoutForm.invalid) {
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
    this.memberService.onAddMember(this.memberFormDto);
    console.warn('Votre marin a été créé', this.memberFormDto);
    this.checkoutForm.reset(); 
    this.messageReturn="Votre marin a bien été enregistré"
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
