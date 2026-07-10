import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";
export const metadata: Metadata = { title: "Project cart" };
export default function CartPage() { return <CartView/>; }