'use client'
import {useEffect,useState} from 'react'
export default function BootPopup(){const[visible,setVisible]=useState(true);useEffect(()=>{const t=setTimeout(()=>setVisible(false),2600);return()=>clearTimeout(t)},[]);if(!visible)return null;return <div className="boot-popup" aria-label="Pit Wall loading"><div className="boot-grid">{Array.from({length:25}).map((_,i)=><i key={i}/>)}</div><div><strong>PIT WALL</strong><span>FLAKY CI DETECTIVE</span></div><b className="boot-cursor">_</b></div>}
