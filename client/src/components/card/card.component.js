import './card.styles.css';

const Card = ({ nft }) => {
  const { token_id, url_image} = nft;

  return (
    <div className='card-container'>
      <img
        alt={`NFT ${token_id}`}
        src={`${url_image}`}
		height = 'auto'
		width = '100%'
      />
      <h2>{token_id}</h2>
    </div>
  );
};

export default Card;
