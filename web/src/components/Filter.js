import React from 'react';
import FilterLink from '../containers/FilterLink/FilterLink';
import { VisibilityFilters } from '../actions/post.actions';

const Filter = () => {
   return (
       <div>
           <span>Filtre: </span>
           <FilterLink filter={VisibilityFilters.ALL}>
               <i className="i-ID-3"></i> Toutes les publications
           </FilterLink>
           <FilterLink filter={VisibilityFilters.GENERAL}>
               <i className="i-Globe"></i> Général
           </FilterLink>
           <FilterLink filter={VisibilityFilters.WITNESS}>
               <i className="i-Business-ManWoman"></i> Témoignage
           </FilterLink>
           <FilterLink filter={VisibilityFilters.PROTOCOL}>
               <i className="i-Conference"></i> Protocole
           </FilterLink>
       </div>
   )
};

export default Filter;