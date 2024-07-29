"use client";
import { notFound } from "next/navigation";
import OrderSettingsItem from "./components/order-setting-item";
import { IDashboardProps } from "../../types/types-dashoboard";

const OrderSettingsComponent = ({ orders }: IDashboardProps) => {
  if (!orders) {
    notFound();
  }

  return (
    <>
      <div className="px-6 py-6 lg:px-12 xl:px-24 2xl:px-28">
        <h2 className="pb-6 text-lg font-semibold">Pedidos</h2>
        <div className="space-y-4">
          {orders.map((order) => (
            <OrderSettingsItem key={order.id} order={order} />
          ))}
        </div>
      </div>
    </>
  );
};
export default OrderSettingsComponent;
