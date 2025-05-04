import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo } from 'src/app/models/equipo.model';
import { EquipoService } from 'src/app/services/equipo.service';

@Component({
  selector: 'app-crear-equipo',
  templateUrl: './crear-equipo.component.html',
  styleUrls: ['./crear-equipo.component.css']
})
export class CrearEquipoComponent implements OnInit{
  equipoForm: FormGroup;
  isEditing = false;
  submitted = false;
  errorMessage: string | null = null;
  equipoId?: number;

  constructor(
    private fb: FormBuilder,
    private equipoService: EquipoService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.equipoForm = this.createForm();
  }

  ngOnInit(): void {
    this.equipoId = this.route.snapshot.params['id'];
    this.isEditing = !!this.equipoId;

    if (this.isEditing) {
      this.loadEquipo(this.equipoId!);
    }
  }

  createForm(): FormGroup {
    return this.fb.group({
      nombreEquipo: ['', [Validators.required]],
      descripcion: [''],
      tipo: [''],
      modelo: [''],
      marca: [''],
      serie: [''],
      ubicacionDelEquipo: [''],
      utilizacion: [''],
      recibidoPor: [''],
      proveedor: [''],
      ordenDeCompra: [''],
      factura: [''],
      fechaDeCompra: [null],
      fechaFinGarantia: [null],
      garantia: [''],
      precio: [null, [Validators.min(0)]],
      procesador: [''],
      memoriaRamGB: [null, [Validators.min(0)]],
      almacenamientoGB: [null, [Validators.min(0)]],
      tipoAlmacenamiento: [''],
      placaBase: [''],
      fuentePoderWatts: [null, [Validators.min(0)]],
      tarjetaGrafica: [''],
      tieneTarjetaRed: [false],
      tieneTarjetaSonido: [false],
      gabinete: [''],
      perifericosEntrada: [''],
      perifericosSalida: [''],
      componentes: [''],
      accesorios: [''],
      sistemaOperativo: [''],
      versionSO: [''],
      driversInstalados: [''],
      programasInstalados: [''],
      utilidadesSistema: [''],
      direccionIP: [''],
      direccionMAC: [''],
    });
  }

  loadEquipo(id: number): void {
    this.equipoService.obtenerEquipoPorId(id).subscribe({
      next: (equipo) => {
        const equipoFormateado = {
          ...equipo,
          fechaDeCompra: equipo.fechaDeCompra
            ? this.formatDateForInput(new Date(equipo.fechaDeCompra))
            : null,
          fechaFinGarantia: equipo.fechaFinGarantia
            ? this.formatDateForInput(new Date(equipo.fechaFinGarantia))
            : null,
        };
        this.equipoForm.patchValue(equipoFormateado);
      },
      error: (err) => {
        this.errorMessage =
          'Error al cargar el equipo: ' +
          (err.message || 'Error desconocido');
      },
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.equipoForm.invalid) {
      return;
    }

    const equipoData: Equipo = this.prepareEquipoData();

    if (this.isEditing) {
      this.updateEquipo(equipoData);
    } else {
      this.createEquipo(equipoData);
    }
  }

  private prepareEquipoData(): Equipo {
    const formValue = this.equipoForm.value;

    const equipoData: Equipo = {
      ...formValue,
      fechaDeCompra: formValue.fechaDeCompra
        ? new Date(formValue.fechaDeCompra)
        : undefined,
      fechaFinGarantia: formValue.fechaFinGarantia
        ? new Date(formValue.fechaFinGarantia)
        : undefined,
    };

    return equipoData;
  }

  private createEquipo(equipo: Equipo): void {
    this.equipoService.crearEquipo(equipo).subscribe({
      next: () => {
        alert('Equipo creado exitosamente');
        this.router.navigate(['/equipos']);
      },
      error: (err) => {
        this.errorMessage =
          'Error al crear el equipo: ' +
          (err.error?.message || err.message || 'Error desconocido');
      },
    });
  }

  private updateEquipo(equipo: Equipo): void {
    this.equipoService.actualizarEquipo(this.equipoId!, equipo).subscribe({
      next: () => {
        alert('Equipo actualizado exitosamente');
        this.router.navigate(['/equipos']);
      },
      error: (err) => {
        this.errorMessage =
          'Error al actualizar el equipo: ' +
          (err.error?.message || err.message || 'Error desconocido');
      },
    });
  }

  private formatDateForInput(date: Date): string {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  get f() {
    return this.equipoForm.controls;
  }

  onCancel(): void {
    this.router.navigate(['/equipos']);
  }
}
