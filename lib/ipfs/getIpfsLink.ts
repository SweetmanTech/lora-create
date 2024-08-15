const getIpfsLink = (hash: string) => {
	return hash?.indexOf?.('ipfs://') > -1
		? hash.replace('ipfs://', `https://ipfs.decentralized-content.com/ipfs/`)
		: hash;
};

export default getIpfsLink;
