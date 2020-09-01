import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-svg-map',
  templateUrl: './svg-map.component.html',
  styleUrls: ['./svg-map.component.scss'],
})
export class SvgMapComponent implements OnInit, AfterViewInit  {

  @Input() data: any = {};

  public stateNorth = 'vert';
  public stateSouth = 'vert';

  constructor() {}
  ngAfterViewInit(): void {
    //this.HideAllPerturbations()
    //this.ShowPerturbation('vent', 'e')
  }

  ngOnInit() {
    console.log(this.data);
    //this.HideAllPerturbations()
    //this.ShowPerturbation('vent', 'e')
  }
  
  HideAllPerturbations(){
    document.querySelectorAll('.pertubation-visible').forEach(el => el.classList.remove('pertubation-visible'));
    console.log("HideAllPerturbations()");
  }

  ShowPerturbation(PerturbationType,PerturbationZone){
    //PerturbationType:vent,panne,accident,deviation
    //perturbationzone:nord,a,b,c,d,e,sud
    if(PerturbationType !== 'vent'){
      console.log(document.getElementById("perturbation-"+PerturbationZone)) //document.getElementById("perturbation-"+PerturbationZone).classList.add('pertubation-visible');
      console.log(document.getElementById("perturbation-"+PerturbationZone).querySelector("[id*="+PerturbationType+"]")) //document.getElementById("perturbation-"+PerturbationZone).querySelector("[id*="+PerturbationType+"]").classList.add('pertubation-visible');
    }else{
      console.log(document.getElementById("perturbation-vent"))
      //document.getElementById("perturbation-vent").classList.add('pertubation-visible');
    }
    console.log("ShowPerturbation (type : "+PerturbationType+", zone : "+PerturbationZone+")");
  }
}
