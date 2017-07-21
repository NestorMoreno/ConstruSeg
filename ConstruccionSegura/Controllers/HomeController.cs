using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ConstruccionSegura.Models;
using Newtonsoft.Json.Linq;
using System.Web.Script.Serialization;
using System.Data.Entity.Infrastructure;
using System.Data.Entity;

namespace ConstruccionSegura.Controllers
{
    public class HomeController : BaseController
    {
        #region Views Methods

        public ActionResult Index()
        {
            ViewBag.dangerGroups = getDangerGroups();
            return View();
        }
        
        [HttpPost]
        public JsonResult GetDangers(int? id, int? idDangerGroup)
        {
            try
            {
                return Json(new { success = true, data = getDangers(id, idDangerGroup) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex }, JsonRequestBehavior.AllowGet); ;
            }
        }

        [HttpPost]
        public JsonResult GetEffects(int? id, int? idDanger)
        {
            try
            {
                return Json(new { success = true, data = getEffects(id, idDanger) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex }, JsonRequestBehavior.AllowGet); ;
            }
        }

        [HttpPost]
        public JsonResult GetRecommendations(int? id, int? idDanger)
        {
            try
            {
                var recommendations = getRecommendations(id, idDanger);
                return Json(new { success = true, data = recommendations }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex }, JsonRequestBehavior.AllowGet); ;
            }
        }

        [HttpPost]
        public JsonResult GetAllRecommendations()
        {
            try
            {
                return Json(new { success = true, data = getRecommendationsList(null, null) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex }, JsonRequestBehavior.AllowGet); ;
            }
        }

        [HttpPost]
        public JsonResult GetRecommendationsType(int? id)
        {
            try
            {
                return Json(new { success = true, data = getRecommendationsType(id) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex }, JsonRequestBehavior.AllowGet); ;
            }
        }

        [HttpPost]
        public JsonResult GetControls(int? id, int? idDanger)
        {
            try
            {
                var controls = getControls(id, idDanger);
                return Json(new { success = true, data = controls }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex }, JsonRequestBehavior.AllowGet); ;
            }
        }

        [HttpPost]
        public JsonResult GetControlsList()
        {
            try
            {
                return Json(new { success = true, data = getControlsList(null, null) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex }, JsonRequestBehavior.AllowGet); ;
            }
        }

        [HttpPost]
        public JsonResult SaveNewEffect(string name)
        {
            try
            {
                return Json(new { success = true, data = saveNewEffect(name) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex }, JsonRequestBehavior.AllowGet); ;
            }
        }

        [HttpPost]
        public JsonResult SaveNewRecommendation(int idDanger, int idType, string name)
        {
            try
            {
                return Json(new { success = true, data = saveNewRecommendation(idDanger, idType, name) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex }, JsonRequestBehavior.AllowGet); ;
            }
        }

        [HttpPost]
        public JsonResult SaveNewControl(int idType, string name, string wilcard)
        {
            try
            {
                return Json(new { success = true, data = saveNewControl(idType, name, wilcard) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex }, JsonRequestBehavior.AllowGet); ;
            }
        }

        [HttpPost]
        public JsonResult AddEffect(int id, int idDanger)
        {
            try
            {
                return Json(new { success = true, data = addEffect(id, idDanger) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex }, JsonRequestBehavior.AllowGet); ;
            }
        }

        [HttpPost]
        public JsonResult AddRecommendation(int id, int idDanger)
        {
            try
            {
                return Json(new { success = true, data = addRecommendation(id, idDanger) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex }, JsonRequestBehavior.AllowGet); ;
            }
        }

        [HttpPost]
        public JsonResult AddControl(int id, int idDanger)
        {
            try
            {
                return Json(new { success = true, data = addControl(id, idDanger) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { success = false, message = ex }, JsonRequestBehavior.AllowGet); ;
            }
        }

        #endregion

        #region Private Methods

        private IEnumerable<SelectListItem> getDangerGroups() {
            try
            {
                using (var context = new Model())
                {
                    return context.grupospeligros.ToList().Select(p => new SelectListItem() { Text = p.Nombre, Value = p.idnGrupoPeligro.ToString() });
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
        }

        private IEnumerable<SelectListItem> getDangers(int? id, int? idDangerGroup)
        {
            try
            {
                using (var context = new Model())
                {
                    if (idDangerGroup.HasValue)
                    {
                        return context.peligros.ToList().Where(p => p.idnGrupoPeligro == idDangerGroup).Select(p => new SelectListItem() { Text = p.Nombre, Value = p.idnPeligro.ToString() });
                    }
                    else
                    {
                        return context.peligros.ToList().Select(p => new SelectListItem() { Text = p.Nombre, Value = p.idnPeligro.ToString() });
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private IEnumerable<SelectListItem> getEffects(int? id, int? idDanger)
        {
            try
            {
                using (var context = new Model())
                {
                    if (idDanger.HasValue)
                    {
                        var effects = context.posiblesefectos.Where(p => p.rpeligrosposiblesefectos.Any(r => r.idnPeligro == idDanger)).ToList();
                        return effects.Select(p => new SelectListItem() { Text = p.Nombre, Value = p.idnPosibleEfecto.ToString() });
                    }
                    else
                    {
                        return context.posiblesefectos.ToList().Select(p => new SelectListItem() { Text = p.Nombre, Value = p.idnPosibleEfecto.ToString() });
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private IEnumerable<SelectListItem> getRecommendationsList(int? id, int? idDanger)
        {
            try
            {
                using (var context = new Model())
                {
                    if (idDanger.HasValue)
                    {
                        return context.recomendaciones.ToList().Where(p => p.idnPeligro == idDanger).Select(p => new SelectListItem() { Text = p.Nombre, Value = p.idnRecomendacion.ToString() });
                    }
                    else
                    {
                        return context.recomendaciones.ToList().Select(p => new SelectListItem() { Text = p.Nombre, Value = p.idnRecomendacion.ToString() });
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private IEnumerable<object> getRecommendations(int? id, int? idDanger)
        {
            try
            {
                using (var context = new Model())
                {
                    if (idDanger.HasValue)
                    {
                        var recommendations = context.recomendaciones.Where(p => p.idnPeligro == idDanger).Select(p => new {
                            idnRecomendacion = p.idnRecomendacion,
                            Nombre = p.Nombre,
                            Peligro = p.peligros.Nombre,
                            TipoRecomendacion = p.tiposrecomendaciones.Nombre
                        }).ToList();
                        return recommendations;
                    }
                    else
                    {
                        var recommendations = context.recomendaciones.Select(p => new {
                            idnRecomendacion = p.idnRecomendacion,
                            Nombre = p.Nombre,
                            Peligro = p.peligros.Nombre,
                            TipoRecomendacion = p.tiposrecomendaciones.Nombre
                        }).ToList();
                        return recommendations;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private IEnumerable<SelectListItem> getRecommendationsType(int? id)
        {
            try
            {
                using (var context = new Model())
                {
                    if (id.HasValue)
                    {
                        return context.tiposrecomendaciones.ToList().Where(p => p.idnTipoRecomendacion == id).Select(p => new SelectListItem() { Text = p.Nombre, Value = p.idnTipoRecomendacion.ToString() });
                    }
                    else
                    {
                        return context.tiposrecomendaciones.ToList().Select(p => new SelectListItem() { Text = p.Nombre, Value = p.idnTipoRecomendacion.ToString() });
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private IEnumerable<object> getControls(int? id, int? idDanger)
        {
            try
            {
                using (var context = new Model())
                {
                    if (idDanger.HasValue)
                    {
                        var controls = context.controlesriesgos.Where(p=>p.peligros.Any(r=> r.idnPeligro == idDanger)).Select(p => new
                        {
                            idnControlRiesgo = p.idnControlRiesgo,
                            Nombre = p.Nombre,
                            Comodin = p.Comodin
                        }).ToList();
                        return controls;
                    }
                    else
                    {
                        var controls = context.controlesriesgos.Select(p => new
                        {
                            idnControlRiesgo = p.idnControlRiesgo,
                            Nombre = p.Nombre,
                            Comodin = p.Comodin
                        }).ToList();
                        return controls;
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private IEnumerable<SelectListItem> getControlsList(int? id, int? idDanger)
        {
            try
            {
                using (var context = new Model())
                {
                    if (idDanger.HasValue)
                    {
                        var controls = context.controlesriesgos.ToList().Where(p => p.peligros.Any(r => r.idnPeligro == idDanger)).ToList();
                        return controls.Select(p => new SelectListItem() { Text = p.Nombre, Value = p.idnControlRiesgo.ToString() });
                    }
                    else
                    {
                        return context.controlesriesgos.ToList().Select(p => new SelectListItem() { Text = p.Nombre, Value = p.idnControlRiesgo.ToString() });
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private int saveNewEffect(string name)
        {
            try
            {
                using (var context = new Model())
                {
                    if (!string.IsNullOrEmpty(name))
                    {
                        var newEffect = new posiblesefectos{
                            Nombre = name
                        };
                        context.posiblesefectos.Add(newEffect);
                        return context.SaveChanges();
                    }
                    return 0;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private int saveNewRecommendation(int idDanger, int idType, string name)
        {
            try
            {
                using (var context = new Model())
                {
                    if (!string.IsNullOrEmpty(name))
                    {
                        var newRecommendation = new recomendaciones
                        {
                            idnPeligro = idDanger,
                            idnTipoRecomendacion = idType,
                            Nombre = name
                        };
                        context.recomendaciones.Add(newRecommendation);
                        return context.SaveChanges();
                    }
                    return 0;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private int saveNewControl(int idType, string name, string wilcard)
        {
            try
            {
                using (var context = new Model())
                {
                    if (!string.IsNullOrEmpty(name))
                    {
                        var newControl = new controlesriesgos
                        {
                            idnTipoControl = idType,
                            Nombre = name,
                            Comodin = wilcard
                        };
                        context.controlesriesgos.Add(newControl);
                        return context.SaveChanges();
                    }
                    return 0;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        private int addEffect(int id, int idDanger)
        {
            try
            {
                using (var context = new Model())
                {
                    if (id > 0 && idDanger > 0)
                    {
                        var newDangerEffect = new rpeligrosposiblesefectos
                        {
                            idnPosibleEfecto = id,
                            idnPeligro = idDanger,
                            dFechaModificacion = DateTime.Now
                        };
                        context.rpeligrosposiblesefectos.Add(newDangerEffect);
                        return context.SaveChanges();
                    }
                    return 0;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private int addRecommendation(int id, int idDanger)
        {
            try
            {
                using (var context = new Model())
                {
                    if (id > 0 && idDanger > 0)
                    {
                        var newRecommendation = context.recomendaciones.Where(p=>p.idnRecomendacion == id).FirstOrDefault();
                        newRecommendation.idnPeligro = idDanger;
                        return context.SaveChanges();
                    }
                    return 0;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private int addControl(int id, int idDanger)
        {
            try
            {
                using (var context = new Model())
                {
                    if (id > 0 && idDanger > 0)
                    {
                        var peligro = context.peligros.Find(idDanger);
                        var controlRiesgo = context.controlesriesgos.Find(id);
                        // Establece la relación entre el peligro y el control                    
                        var stateManager = ((IObjectContextAdapter)context).ObjectContext.ObjectStateManager;
                        stateManager.ChangeRelationshipState(
                            controlRiesgo,
                            peligro,
                            c => c.peligros,
                            EntityState.Added);
                        return context.SaveChanges();
                    }
                    return 0;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        #endregion
    }
}