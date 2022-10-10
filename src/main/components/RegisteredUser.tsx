const RegisteredUser = ({
    capacity,
    name,
    detail,
}: {
    capacity: number;
    name: string;
    detail: string;
}) => {
    return (
        <div className="card shadow-md">
            <div className="card-body">
                <div className="card-title">{name}</div>
                <span>{capacity}</span>
                <span>{detail}의 술잔</span>
            </div>
            <img />
        </div>
    );
};

export default RegisteredUser;
