class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: string;
    public endDate: string;
    public price: number;
    public image: File;
    public imageUrl: string;
    public isFollowing: number;
    public followersCount: number;

}

export default VacationModel;