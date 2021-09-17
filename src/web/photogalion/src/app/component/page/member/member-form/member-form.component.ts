import { Component, NgModule, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { TryCatchStmt } from '@angular/compiler';
import { MemberFormDto } from 'src/app/models/member';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { isNull } from '@angular/compiler/src/output/output_ast';



@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {
  //items = this.memberService.getItems();
  memberFormDto:MemberFormDto= new MemberFormDto();
  messageReturn:String;

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
    private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.getMemberForm();
  }

  onSubmit(): String | undefined {
    if (this.checkoutForm.invalid) {
      if(this.checkoutForm.status==null){
          
      this.messageReturn= "Certains champs sont obligatoires !!!";
      }
      //this.messageReturn= "Certains champs sont obligatoires";
      return this.messageReturn;
    }
    // Process checkout data here
    //this.items = this.memberService.clearCart();
    try {
      // ... map les valeurs 
      this.memberFormDto= { ...this.checkoutForm.value}
      this.memberService.onAddMember(this.memberFormDto);
    console.warn('Votre marin a été créé', this.memberFormDto);
    this.checkoutForm.reset(); 
    this.router.navigate(['/member']);
    this.messageReturn="Votre mari a bien été enregistré"
    return this.messageReturn;
    } catch (error) {
      return
      
    }
    
  }

  public getMemberForm(){

  }
}
