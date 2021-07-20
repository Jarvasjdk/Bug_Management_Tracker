
export class Bug{
    public id: string;
    public  bugId: string;
    public  bugDescription: string;
    public  bugLocation: string;
    public  bugPriority: string;
    public  isActive: boolean;
    public  bugType: string;
    public  projectName: string;

    constructor() {
        this.id = '';
        this.bugId = '';
        this.bugDescription = '';
        this.bugLocation = '';
        this.bugPriority = '';
        this.bugType = '';
        this.isActive = false;
      }
}