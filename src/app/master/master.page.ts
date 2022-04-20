import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.page.html',
  styleUrls: ['./master.page.scss'],
})
export class MasterPage implements OnInit {
  data:any;
  selectedImage:any;
  imageUrl: any;
  CreateForm: FormGroup;
  constructor(private formbuilder: FormBuilder,private product: ProductsService) { 
    this.CreateForm = this.formbuilder.group({
      name: ['',Validators.required],
      detail: ['',Validators.required],
      image: ['',Validators.required],
    })
  }

  ngOnInit() {
    this.getProfiles();
  }
 getProfiles(){
  this.product.getProfiles().subscribe((res:any)=>{
    console.log(res);
    this.data=res.data;
  })
  }
  onCreate(){
    const fd = new FormData();
    fd.append('name',this.CreateForm.get('name').value);
    fd.append('detail',this.CreateForm.get('detail').value);
    fd.append('image', this.selectedImage, this.selectedImage.name);
   this.product.createProfile(fd).subscribe((res:any)=>{
     console.log(res);
     this.getProfiles();
    })
  }
 
  
  onImageSelected(event) {

    this.selectedImage = event.target.files[0];
    let reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };
    reader.readAsDataURL(this.selectedImage);
  }
}
