<template>
    <div class="row">
        <div class="col-sm-12" style="margin-bottom:5px">
            <div class="dropdown">
                Resultados por página 
                <a class="btn btn-secondary btn-sm dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" >
                    {{ pagination.rows }}
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a class="dropdown-item" @click="updateRowPage(10)" href="#">10</a>
                    <a class="dropdown-item" @click="updateRowPage(25)" href="#">25</a>
                    <a class="dropdown-item" @click="updateRowPage(50)" href="#">50</a>
                    <a class="dropdown-item" @click="updateRowPage('all')" href="#">Todos</a>
                </div>
            </div>
        </div>

        <div class="col-sm-12" style="overflow-x:auto;">
            <table class="table table-bordered table-striped table-hover table-sm" 
                width="100%" :style="{'min-width': min_width}" >
                <thead class="thead-dark">
                    <tr>
                        <th
                            v-for="column in columns"  
                            :key="column.name"
                            @click="sortBy(column.name)"
                            class="table-header"
                            :style="{ width: column.width, 'min-width': column.min_width || ''}">
                            {{column.label}}
                            <template v-if="currentSort === column.name" > 
                                <i v-if="currentSortDir == 'asc'" class="fa fa-sort-amount-asc" aria-hidden="true"></i>
                                <i v-else class="fa fa-sort-amount-desc" aria-hidden="true"></i>
                            </template>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="item in paginatedItems" >
                        <slot name="item" :item="item" />
                    </template>
                    <tr v-if="items.length == 0">
                        <td v-show="!loading" :colspan="[numberColumns]">Ningún dato disponible en esta tabla</td>
                        <td v-show="loading" :colspan="[numberColumns, loaderClass]" > </td>
                    </tr>
                    <tr v-else-if="filteredItems.length == 0">
                        <td colspan="6">Ningún dato disponible para el filtro: {{ filter }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="col-sm-9">
            <span class="page-stats">
                Resultados del {{pagination.from}} al {{pagination.to}} de un total de {{filteredItems.length}} registros
            </span>
        </div>

        <!-- Nav-->
        <div class="col-sm-3">
            <nav aria-label="Page navigation example">
                <ul class="pagination  justify-content-end">
                    <li class="page-item" :class="{'disabled': !pagination.prevPage}">
                        <button type="button" class="page-link"
                            @click="--pagination.currentPage" >
                            Anterior
                        </button>
                    </li>
                    <li class="page-item" :class="{'disabled': !pagination.nextPage}">
                        <button type="button" class="page-link"
                            @click="++pagination.currentPage">
                            Siguiente
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
 
    </div>
</template>


<script>

//import Loading from 'vue-loading-overlay';

export default {
    name: 'VTable',
    props: {
        items: {
            type: Array,
            required: true
        },
        columns: {
            type: Array,
            required: true
        },
        min_width: {},
        rows_page: {},
        loading: {},
        sort_by: {},
        sort_dir: {}
,    },
    
    components: {  },
    data(){
        return {
            currentSort: this.$props.sort_by || 'id',
            currentSortDir: this.$props.sort_dir || 'desc',
            pagination: {
                currentPage: 1,
                total: '',
                nextPage: '',
                prevPage: '',
                from: '',
                to: '',
                rows: ''
            },
            loaderClass: 'vld-parent',
            numberColumns: this.$props.columns.length,

            rows_page_options: [
                { label: '10', value: 10 },
                { label: '25', value: 25 },
                { label: '50', value: 50 },
                { label: 'todos', value: 'all' },
            ],
        }
    },
    computed:{
        itemsIsEmpty() {
            return this.items == 0
        },
        filteredItems() {
            this.resetPagination();
            let items = this.items;
            //filter
            const self = this
            if(this.filter_by_col && this.filter_by){
                items = items.filter((row) => {
                    return Object.keys(row).some((key) => {
                        return String(row[self.filter_by_col] ).toLowerCase().indexOf(self.filter_by.toLowerCase()) > -1;
                    })
                });
            }
            //order
            items = items.sort((a,b) => {
                let x = (typeof a[this.currentSort] === 'string') ? a[this.currentSort].toLowerCase() : a[this.currentSort];
                let y = (typeof b[this.currentSort] === 'string') ? b[this.currentSort].toLowerCase() : b[this.currentSort];
                let modifier = 1;
                if(this.currentSortDir === 'desc') modifier = -1;
                if(x < y) return -1 * modifier;
                if(x > y) return 1 * modifier;
                return 0;
            });
            return items;
        },
        paginatedItems() {
            var rows_per_page = this.pagination.rows || 10

            return this.paginate(this.filteredItems, rows_per_page , this.pagination.currentPage);
        },
    },
    methods: {
        paginate(array, length, pageNumber) {
            this.pagination.from = array.length ? ((pageNumber - 1) * length) + 1 : ' ';
            this.pagination.to = pageNumber * length > array.length ? array.length : pageNumber * length;
            this.pagination.prevPage = pageNumber > 1 ? pageNumber : '';
            this.pagination.nextPage = array.length > this.pagination.to ? pageNumber + 1 : '';
            return array.slice((pageNumber - 1) * length, pageNumber * length);
        },
        sortBy(key) {
            this.resetPagination();
            if(this.currentSort == key){
                this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
            }
            this.currentSort = key;
        },
        resetPagination() {
            this.pagination.currentPage = 1;
            this.pagination.prevPage = '';
            this.pagination.nextPage = '';
        },
        sort:function(s) {
            if(s === this.currentSort) {
                this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
            }
            this.currentSort = s;
        },
        getPage(){
            return this.pagination.currentPage
        },
        updateRowPage(rows_page){
            if(rows_page == 'all'){
                this.pagination.rows=  this.items.length
            } else {
                this.pagination.rows = rows_page
            }

            this.resetPagination();
        }
    },
    created(){
        this.pagination.rows = (this.$props.rows_page || 10)
    }
}
</script>


<style scoped>
   
    .table td { text-align: center; font-size:0.9em; }
    .table th { text-align: center; vertical-align: middle}
    .table-header i {  color:#9c9c9c }
    th.table-header{
        cursor: pointer
    }

</style>

