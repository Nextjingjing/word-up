import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function GameCard({name, content, img}) {
  return (
    <Card style={{ width: '25rem' }}>
      <Card.Body>
        <Card.Img variant="top" src={img} className="w-25 h-25 d-block mx-auto" />
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {content}
        </Card.Text>
        <Button variant="primary" className="d-block mx-auto"   >Let's go</Button>
      </Card.Body>
    </Card>
  );
}

export default GameCard;