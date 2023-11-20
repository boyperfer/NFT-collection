import Card from '../card/card.component';
import './card-list.styles.css';

const CardList = ({ nfts }) => (
  <div className='card-list'>
    {nfts.map((nft) => {
		console.log(nft.nft_id, nft.collection_id);
      return <Card key={nft.nft_id} nft={nft} />;
    })}
  </div>
);

export default CardList;
