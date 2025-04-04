import React, { useEffect, useState, useTransition } from 'react'
import { getCountryData } from '../api/postApi';
import Loader from '../components/UI/Loader';

const Country = () => {
  const [isPending, startTransition] = useTransition();
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    startTransition(async () => {
      const response = await getCountryData();
      setCountries(response.data)
    })
  }, [])


  if (isPending) return <Loader/>

  return (
    <h1>
      Country Page
    </h1>
  )
}

export default Country
