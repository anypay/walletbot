import { Cluster, clusterApiUrl, Connection } from '@solana/web3.js';

/**
 * Establish a connection to the cluster
 */
export async function establishConnection(cluster: Cluster = 'mainnet-beta'): Promise<Connection> {
    const endpoint = clusterApiUrl(cluster);
    const connection = new Connection(endpoint, 'confirmed');
    const version = await connection.getVersion();

    console.log('solana.connection.established', { endpoint, version })

    return connection;
}
