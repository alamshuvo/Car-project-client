import logo from './car_valley_logo.png';

interface ILogoProps {
    height: number;
    width: number;
};
const Logo = ({ height, width }: ILogoProps) => {
    return (
        <div>
            <img height={height} width={width} src={logo} alt="" />
        </div>
    );
};

export default Logo;