from production.models.country import Country
from production.models.producer import Producer
from production.models.equipment import Equipment
from production.models.mold import MoldBase, MoldModifier, MoldInsert
from production.models.account_info import AccountInfoEquipment
from production.models.color_models import Color, ColorScheme
from production.models.recipe_color_scheme import RecipeColorScheme
from production.models.goods import Goods
from production.models.detail_models import DetailInGoods, DetailName
from production.models.material import AddMaterial, MaterialType, MainMaterial, MasterBatch
from production.models.injection_molding_machine import IMM
from production.models.defects import Defects, DefectEvent
from production.models.production_request import ProductionRequest, ProductionRequestStartStop
from production.models.production_report import ProductionReport, ProductionForRequest
from production.models.quality_report import QualityReport, QualityReportDefects, QualityForRequest
from production.models.recipe import Recipe, RecipeDetail
from production.models.detail_tech_data import DetailBaseData, DetailActualData


