import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('produto')
export class Produto {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar")
  nome: string;
 
  @Column("integer")
  nCdFormato: number;

  @Column("decimal")
  nVlComprimento: number;

  @Column("decimal")
  nVlAltura: number;

  @Column("decimal")
  nVlLargura: number;

  @Column("varchar")
  nVlPeso: string;

  @Column("decimal")
  nVlDiametro: number;

  @Column("decimal")
  nVlValorDeclarado: number;

  @Column("varchar")
  sCdAvisoRecebimento: string;

  @Column("varchar")
  sCdMaoPropria: string;
 
  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;
  
  @CreateDateColumn({type: "timestamp"})
  updatedAt: Date;

}