import Image from "next/image";
import Banner from '@/components/Banner'
import Card from '@/components/Card'
import styles from "./page.module.css";


export default function Home() {

  return (
    <main>
      <div>
        <Banner/>
        <div className="flex justify-center items-center gap-5 my-3 mx-3">
        <Card shopName="TestShop" imgSrc=""/>
        <Card shopName="TestShop" imgSrc=""/>
        <Card shopName="TestShop" imgSrc=""/>
        <Card shopName="TestShop" imgSrc=""/>
        <Card shopName="TestShop" imgSrc=""/>
        </div>
      </div>

    </main>
  );
}
