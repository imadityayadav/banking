"use client";
import React from 'react'
import CountUp from 'react-countup';


import { useRef } from 'react';

const AnimatedCounter = ({amount}:{amount:number}) => {
    const myRef = useRef(null);
  return (
    <div className='' ref={myRef}>
        <CountUp
        duration={2.75}
        decimals={2}
        decimal=","
        prefix="$"
         end={amount}></CountUp>
    </div>
  )
}

export default AnimatedCounter
