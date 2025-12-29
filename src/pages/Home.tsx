import { useConnection } from 'wagmi'
import ClientPage from '../components/cms/ClientPage'
import Notes from './Notes'

export default function Home() {
    const connection = useConnection()

    return connection.isConnected ? <Notes /> : <ClientPage />
}
