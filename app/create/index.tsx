import {
  Text,
  View,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native"
import { colors } from "../../constants/colors"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Header } from "@/components/header"
import { Select } from "../../components/input/select"

const schema = z.object({
  gender: z.string().min(1, { message: "O sexo é obrigatório" }),
  objective: z.string().min(1, { message: "O objetivo é obrigatório" }),
  level: z.string().min(1, { message: "Selecione o seu level" }),
})

type FormData = z.infer<typeof schema>

export default function create() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const genderOptions = [
    { label: "Masculino", value: "masculino" },
    { label: "Feminino", value: "feminino" },
  ]

  const levelOptions = [
    {
      label: "Sedentário (pouco ou nenhuma atividade física)",
      value: "Sedentário",
    },
    {
      label: "Levemente ativo (exercícios de 1 a 3 vezes na semana)",
      value: "Levemente ativo (exercícios de 1 a 3 vezes na semana)",
    },
    {
      label: "Moderadamente ativo (exercícios 3 a 5 vezes na semana)",
      value: "Moderadamente ativo (exercícios 3 a 5 vezes na semana)",
    },
    {
      label: "Altamente ativo (exercícios de 5 a 7 vezes na semana)",
      value: "Altamente ativo (exercícios de 5 a 7 vezes na semana)",
    },
  ]

  return (
    <View style={styles.container}>
      <Header step="Passo 2" title="Finalizando dieta" />

      <ScrollView style={styles.content}>
        <Text style={styles.label}>Sexo:</Text>
        <Select
          control={control}
          name="gender"
          placeholder="Selecione o seu sexo..."
          error={errors.gender?.message}
          options={genderOptions}
        />
      </ScrollView>

      <ScrollView style={styles.content}>
        <Text style={styles.label}>Selecione o nível de atividade física:</Text>
        <Select
          control={control}
          name="level"
          placeholder="Selecione o seu nível de atividade físia"
          error={errors.level?.message}
          options={levelOptions}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  label: {
    fontSize: 16,
    color: colors.white,
    fontWeight: "bold",
    marginBottom: 8,
  },
  content: {
    paddingLeft: 16,
    paddingRight: 16,
  },
})
