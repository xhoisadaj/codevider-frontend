import {Routes, Route} from 'react-router-dom'
import {Home, AnimalList, Admin, PageNotFound} from "../pages"

import React from 'react'

export const AllRoutes = () => {
  return (
    <div className="dark:bg-slate-800">
    <Routes>
        <Route path="" element={<Home />}/>
        <Route path="/category/dogs" element={<AnimalList apiPath = "dogs" />}/>
        <Route path="/category/cats" element={<AnimalList apiPath = "cats"/>}/>
        <Route path="/category/birds" element={<AnimalList apiPath = "birds" />}/>
        <Route path="/search" />
        <Route path="/admin" element={<Admin/>} />
        <Route path="*" element={<PageNotFound />}/>

    </Routes>
    </div>
  )
}
 