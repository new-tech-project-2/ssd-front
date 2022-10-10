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
            <div className="card-body flex flex-row">
                <div className="card-title mr-1">
                    <span className="text-3xl text-primary">{capacity}잔</span>
                </div>
                <div className="flex flex-col flex-auto mx-1">
                    <span className="font-bold mb-1">{name}</span>
                    <span>{detail}의 술잔</span>
                </div>
                <div className="card-action">
                    <button className="btn btn-secondary ml-1 rounded-lg">
                        편집
                    </button>
                </div>
            </div>
            <img />
        </div>
    );
};

export default RegisteredUser;
