import MailSent from './mailSent.svg';
import Checked from './checked.svg';
import Cupom from './cupom.svg';
import Card from './Card.svg';
import Money from './Money.svg';
import RightArrow from './RightArrow.svg';
import Location from './Location.svg';
import Dots from './dots.svg';
import Edit from './Edit.svg';
import Delete from './delete.svg';

type Props = {
    width: number;
    height: number;
    svg: string;
    color: string;
    
}

export const Icon = ({width, height, svg, color}: Props) => {
    return(
        <div style={{ width, height }}>
            {svg === 'card' && <Card color={color} />}
            {svg === 'checked' && <Checked color={color} />}
            {svg === 'cupom' && <Cupom color={color} />}
            {svg === 'location' && <Location color={color} />}
            {svg === 'mailSent' && <MailSent color={color} />}
            {svg === 'money' && <Money color={color} />}
            {svg === 'rightarrow' && <RightArrow color={color} />}
            {svg === 'dots' && <Dots color={color} />}
            {svg === 'edit' && <Edit color={color} />}
            {svg === 'delete' && <Delete color={color} />}
        </div>
    );
}