
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import TableGrid, { TableType } from "@/components/reservation/TableGrid";

const Reservation = () => {
  // Mock data for tables
  const [tables] = useState<TableType[]>([
    {
      id: 1,
      number: 1,
      capacity: 2,
      isAvailable: true,
      position: { x: 0, y: 0 },
    },
    {
      id: 2,
      number: 2,
      capacity: 2,
      isAvailable: false,
      position: { x: 1, y: 0 },
    },
    {
      id: 3,
      number: 3,
      capacity: 4,
      isAvailable: true,
      position: { x: 2, y: 0 },
    },
    {
      id: 4,
      number: 4,
      capacity: 4,
      isAvailable: true,
      position: { x: 0, y: 1 },
    },
    {
      id: 5,
      number: 5,
      capacity: 6,
      isAvailable: false,
      position: { x: 1, y: 1 },
    },
    {
      id: 6,
      number: 6,
      capacity: 2,
      isAvailable: true,
      position: { x: 2, y: 1 },
    },
    {
      id: 7,
      number: 7,
      capacity: 6,
      isAvailable: true,
      position: { x: 0, y: 2 },
    },
    {
      id: 8,
      number: 8,
      capacity: 3,
      isAvailable: true,
      position: { x: 1, y: 2 },
    },
    {
      id: 9,
      number: 9,
      capacity: 4,
      isAvailable: false,
      position: { x: 2, y: 2 },
    },
    {
      id: 10,
      number: 10,
      capacity: 5,
      isAvailable: true,
      position: { x: 0, y: 3 },
    },
    {
      id: 11,
      number: 11,
      capacity: 3,
      isAvailable: true,
      position: { x: 1, y: 3 },
    },
    {
      id: 12,
      number: 12,
      capacity: 6,
      isAvailable: true,
      position: { x: 2, y: 3 },
    },
  ]);

  return (
    <Layout>
      <section className="py-10 bg-cream">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2 text-coffee-dark text-center">
            Table Reservation
          </h1>
          <p className="text-center mb-8 text-muted-foreground">
            Select your party size and preferred time to see available tables
          </p>

          <TableGrid tables={tables} />
        </div>
      </section>
    </Layout>
  );
};

export default Reservation;
