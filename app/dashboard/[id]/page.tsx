
import {  useParams  } from 'next/navigation'
export default function Recommendations() {
    const {id} = useParams<{id: string}>()
    }