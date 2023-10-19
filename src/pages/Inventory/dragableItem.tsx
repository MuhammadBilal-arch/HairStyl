import { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { EditCategoryCards } from '../../components/Inventory/EditCategory';
import { useNavigate } from 'react-router-dom';

export const DraggableItem = ({ id, name, index, moveItem }: any) => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const [, drag] = useDrag(
    () => ({
      type: 'item',
      item: { id, index },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item: any, monitor: any) => {
        const dropResult = monitor.getDropResult();
        if (dropResult && moveItem) {
          const { dragIndex, hoverIndex } = dropResult;
          moveItem(dragIndex, hoverIndex);
        }
      },
    }),
    [id, index, moveItem]
  );

  drag(ref);

  return (
    <div ref={ref}>
      <EditCategoryCards
        onClick={() =>
          navigate('/edit-inventory', {
            state: name,
          })
        }
        title={name}
        quantity={2}
      />
    </div>
  );
};