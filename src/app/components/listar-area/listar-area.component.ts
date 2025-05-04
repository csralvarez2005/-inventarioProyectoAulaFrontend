import { Component, OnInit } from '@angular/core';
import { Area } from 'src/app/models/area.model';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-listar-area',
  templateUrl: './listar-area.component.html',
  styleUrls: ['./listar-area.component.css']
})
export class ListarAreaComponent implements OnInit{
  areas: Area[] = [];

  constructor(private areaService: AreaService) {}

  ngOnInit(): void {
    this.obtenerAreas();
  }

  obtenerAreas(): void {
    this.areaService.listarAreas().subscribe(data => {
      this.areas = data;
    });
  }

}
