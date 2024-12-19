import { FilterQuery, Query } from 'mongoose';

class QueryBuilder<T> {
    public modelQuery: Query<T[], T>;
    public query: Record<string, unknown>;

    constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
        this.modelQuery = modelQuery;
        this.query = query;
    }

    search(searchableFields: string[]) {
        const searchTerm = this.query.searchTerm as string;
        if (searchTerm) {
            this.modelQuery = this.modelQuery.find({
                $or: searchableFields.map(
                    (field) =>
                        ({
                            [field]: { $regex: searchTerm, $options: 'i' },
                        }) as FilterQuery<T>,
                ),
            });
        }
        return this;
    }

    filter() {
        const queryObj = { ...this.query };

        const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields']; 
        excludeFields.forEach((el) => delete queryObj[el]);

        this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);
        return this;
    }

    sort() {
        const sortField = this.query.sort as string;
        const sort = sortField ? sortField.split(',').join(' ') : '-createdAt'; 
        this.modelQuery = this.modelQuery.sort(sort);
        return this;
    }

    
    paginate() {
        const page = Number(this.query.page) || 1; 
        const limit = Number(this.query.limit) || 10; 
        const skip = (page - 1) * limit;

        this.modelQuery = this.modelQuery.skip(skip).limit(limit);
        return this;
    }

    
    fields() {
        const fields = this.query.fields as string;
        const selectFields = fields ? fields.split(',').join(' ') : '-__v'; 

        this.modelQuery = this.modelQuery.select(selectFields);
        return this;
    }
}

export default QueryBuilder;
