import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useWatch } from "react-hook-form";
import { getNotices } from "../../redux/notices/noticesOperations";
import { setFilters, setNoticesPage } from "../../redux/notices/noticesSlice";
import { selectFiltersWithPage } from "../../redux/notices/noticesSelectors";

export function AutoSubmit({ control }) {
  const dispatch = useDispatch();
  const values = useWatch({ control });
  const params = useSelector(selectFiltersWithPage);

  const buildParams = (values) => {
    const params = {
      ...(values.title && { keyword: values.title }),
      ...(values.category &&
        values.category !== "all" && { category: values.category }),
      ...(values.sex && values.sex !== "all" && { sex: values.sex }),
      ...(values.species &&
        values.species !== "all" && { species: values.species }),
      ...(values.location && { locationId: values.location }),
    };

    if (values.sort) {
      const [key, val] = values.sort.split("_");

      if (key === "byPrice") {
        params.byPrice = val === "true";
      } else if (key === "byPopularity") {
        params.byPopularity = val === "false";
      } else if (key === "freeFirst") {
        params.freeFirst = true;
      } else if (key === "freeLast") {
        params.freeLast = true;
      }
    }

    return params;
  };

  useEffect(() => {
    if (!values) return;

    const params = buildParams(values);

    dispatch(setFilters(params));
    dispatch(setNoticesPage(1));
    dispatch(getNotices({ ...params, page: 1, perPage: 6 }));
  }, [values, dispatch]);

  return null;
}
