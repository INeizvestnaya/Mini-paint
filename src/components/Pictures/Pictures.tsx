import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

import { Picture } from '../../types';

interface Props {
  pictures: Picture[];
  filter: string;
}

const Pictures: React.FC<Props> = ({ pictures }) => (
  <ImageList cols={2} gap={10} sx={{ margin: 3 }}>
    {pictures.map((picture) => (
      <ImageListItem key={picture.nameId}>
        <img src={picture.url} alt={picture.name} loading="lazy" />
        <ImageListItemBar
          title={picture.name}
          subtitle={picture.author}
          position="below"
        />
      </ImageListItem>
    ))}
  </ImageList>
);

export default Pictures;
