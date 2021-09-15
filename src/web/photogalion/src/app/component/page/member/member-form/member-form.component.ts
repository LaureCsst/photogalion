import { Component, NgModule, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TryCatchStmt } from '@angular/compiler';
import { MemberFormDto } from 'src/app/models/member';



@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  //items = this.memberService.getItems();
  memberFormDto:MemberFormDto= new MemberFormDto();

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
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getMemberForm();
  }

  onSubmit(): void {
    if (this.checkoutForm.invalid) {
      
      //tambouille pour afficher des trucs avant le return
      return;
    }
    // Process checkout data here
    //this.items = this.memberService.clearCart();
    try {
      // ... map les valeurs 
      this.memberFormDto= { ...this.checkoutForm.value}
      this.memberService.onAddMember(this.memberFormDto);
    console.warn('Votre marin a été créé', this.memberFormDto);
    this.checkoutForm.reset();  
    } catch (error) {
      
    }
    
  }

  public getMemberForm(){

  }
}
