'use client'

import { JBMono } from '@/fonts';
import React, { useState } from 'react'

const StravaCard = ({ run } : any) => {
  return (
    <div className={JBMono.className + " bg-red-500 text-white p-2"}>
        <p className='border-2 border-dashed border-white p-2 text-xl font-bold'>{(run.name).toUpperCase()}</p>
    </div>
  )
}

export default StravaCard